export const handleGender = (gender, language) => {
    // console.log(gender);
    // console.log(language);
    if (gender) {
        switch (language) {
            case 'vi':
                return gender.valueVi;
            case 'en':
                return gender.valueEn;
            default:
                break;
        }
    }
};
