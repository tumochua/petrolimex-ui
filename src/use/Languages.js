export const useChangeLanguageRole = (language, state) => {
    if (state.userInfor && state.userInfor.data) {
        switch (language) {
            case 'vi':
                return {
                    // ...state,
                    value: state.userInfor.data.roleData.valueVi,
                };
            case 'en':
                return {
                    // ...state,
                    value: state.userInfor.data.roleData.valueEn,
                };
            default:
                throw new Error('Invalid language');
        }
    }
};
export const useChangeLanguageGender = (language, state) => {
    // console.log('state', state);
    if (state.userInfor && state.userInfor.data) {
        switch (language) {
            case 'vi':
                return {
                    // ...state,
                    value: state.userInfor.data.genderData.valueVi,
                };
            case 'en':
                return {
                    // ...state,
                    value: state.userInfor.data.genderData.valueEn,
                };
            default:
                throw new Error('Invalid language');
        }
    }
};

export const useChangeLanguageFamilyInfo = (language, gender) => {
    // console.log('language', language);
    // console.log('state', gender);
    if (gender) {
        switch (language) {
            case 'vi':
                return {
                    // ...state,
                    valueFather: gender.genderFatherData.valueVi,
                    valueMommy: gender.genderMommyData.valueVi,
                };
            case 'en':
                return {
                    // ...state,
                    valueFather: gender.genderFatherData.valueEn,
                    valueMommy: gender.genderMommyData.valueEn,
                };
            default:
                throw new Error('Invalid language');
        }
    }
};
