class CheckRoles {
    isAdmin = roles => {
        let isAdmin = false;

        roles.forEach(role => {
            if (role.name === 'ADMIN') {
                isAdmin = true;
            }
        });

        return isAdmin;
    };
}

module.exports = new CheckRoles();