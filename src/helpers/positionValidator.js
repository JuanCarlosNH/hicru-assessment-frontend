

const TITLE_LENGTH = 100;
const DESCRIPTION_LENGTH = 1000;

export const titleValidation = (title) => {

    if(title === undefined || title.trim() === "") {
        return "title can not be empty";
    }

    if(title.trim().length > TITLE_LENGTH) {
        return "title must be less than 100 characters long"
    }
    return "";

}

export const descriptionValidation = (description) => {

    if(description === undefined || description.trim() === "") {
        return "description can not be empty";
    }

    if(description.trim().length > DESCRIPTION_LENGTH) {
        return "description must be less than 1000 characters long"
    }
    return "";

}

export const locationValidation = (location) => {
    if(location === undefined || location.trim() === "") {
        return "location can not be empty";
    }
    return "";
}

export const statusValidation = (status) => {
    if(status === undefined || status === "0") {
        return "can not be empty";
    }
    return "";
}

export const budgetValidation = (budget) => {
    if(budget === undefined) {
        return "can not be empty";
    }
    if(budget < 0) {
        return "can not be negative";
    }
    return "";
}

export const departmentValidation = (department) => {
    if(department === undefined || department === 0) {
        return "can not be empty";
    }
    return "";
}

export const recruiterValidation = (recruiter) => {
    if(recruiter === undefined || recruiter === 0) {
        return "can not be empty";
    }
    return "";
}