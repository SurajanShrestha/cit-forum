const userSessionName = 'cdUser';

// For User Session for checking roles & permissions
export const getUser = () => {
    // Returns the whole user object
    return JSON.parse(sessionStorage.getItem(userSessionName));
};

export const getUserRoleId = () => {
    // Returns only the user role which is in string format
    return JSON.parse(sessionStorage.getItem(userSessionName)).roleId;
};

export const setUser = (userData) => {
    if (userData) {
        console.log(userData);
        const sessionUserData = {
            id: userData.id,
            name: userData.name,
            roleId: userData.RoleId,
        };
        sessionStorage.setItem(userSessionName, JSON.stringify(sessionUserData));
    }
};

export const removeUser = () => {
    sessionStorage.removeItem(userSessionName);
};