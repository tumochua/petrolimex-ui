import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { format, isSameDay, parse, isValid, subDays, startOfMonth, startOfYear } from 'date-fns';
import { apiListSales } from '@/services/apis';
import Header from '@/layouts/Header';
import style from './Sales.module.scss'; // Import SCSS

const Sales = () => {
    const [chartData, setChartData] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('today'); // Default is today
    const today = new Date();

    // Function to filter sales based on the selected period
    const filterSalesByPeriod = (rawData, period) => {
        let startDate;
        switch (period) {
            case '3days':
                startDate = subDays(today, 3);
                break;
            case '7days':
                startDate = subDays(today, 7);
                break;
            case '1month':
                startDate = startOfMonth(today);
                break;
            case '1year':
                startDate = startOfYear(today);
                break;
            default:
                startDate = today; // Default to today
                break;
        }

        return rawData.filter(item => {
            const saleDate = parse(item.day_for_sale, "yyyy-MM-dd", new Date());
            return isValid(saleDate) && saleDate >= startDate;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiListSales();
                const rawData = res?.data?.data || [];

                if (rawData.length === 0) {
                    setChartData([{ day: format(today, "dd/MM/yyyy"), A92: 0, A95: 0, E5: 0 }]);
                    return;
                }

                let filteredSales = [];
                if (selectedPeriod === 'today') {
                    // Only get data for today
                    filteredSales = rawData.filter(item => {
                        const saleDate = parse(item.day_for_sale, "yyyy-MM-dd", new Date());
                        return isValid(saleDate) && isSameDay(saleDate, today);
                    });
                } else {
                    // Filter based on selected period
                    filteredSales = filterSalesByPeriod(rawData, selectedPeriod);
                }

                const summary = {
                    day: format(today, "dd/MM/yyyy"),
                    A92: 0,
                    A95: 0,
                    E5: 0,
                };

                filteredSales.forEach(item => {
                    const sales = parseInt(item.sales_figures_day || "0", 10);
                    if (summary[item.type] !== undefined) {
                        summary[item.type] += sales;
                    }
                });

                setChartData([summary]);

            } catch (error) {
                console.error("Error fetching sales data:", error);
                setChartData([{ day: format(today, "dd/MM/yyyy"), A92: 0, A95: 0, E5: 0 }]);
            }
        };

        fetchData();
    }, [today, selectedPeriod]);

    return (
        <>
            <Header />
            <div className={style.container} style={{ minWidth: 400 }}>
                <h2 className="text-xl font-bold mb-4">
                    Doanh số bán xăng - {format(today, "dd/MM/yyyy")}
                </h2>

                <div className={style['select-container']}>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        <option value="today">Hôm nay</option>
                        <option value="3days">3 Ngày gần nhất</option>
                        <option value="7days">7 Ngày gần nhất</option>
                        <option value="1month">1 Tháng gần nhất</option>
                        <option value="1year">1 Năm gần nhất</option>
                    </select>
                </div>

                <div className={style['recharts-wrapper']}>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            barCategoryGap="20%"
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="A92" fill="#8884d8" name="Xăng A92" label={{ position: 'top', fill: '#000' }} />
                            <Bar dataKey="A95" fill="#82ca9d" name="Xăng A95" label={{ position: 'top', fill: '#000' }} />
                            <Bar dataKey="E5" fill="#ffc658" name="Xăng E5" label={{ position: 'top', fill: '#000' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

export default Sales;
