export const getPermission = (moduleName, pageName) => {
    const storedDataString = sessionStorage.getItem('userPermission');

    let storedData = JSON.parse(storedDataString);

    let reconstructedPermissions = {};
    storedData.modules.forEach(module => {
        module.pages.forEach(page => {
            const pageModuleName = module.applicationModuleName;
            const pagePageName = page.pageName;
            const pagePermission = page.permission;
            if (!reconstructedPermissions[pageModuleName]) {
                reconstructedPermissions[pageModuleName] = {};
            }
            reconstructedPermissions[pageModuleName][pagePageName] = pagePermission;
        });
    });

    // Retrieve permissions for the specified module and page
    const permissions = reconstructedPermissions[moduleName];

    const pagePermissions = permissions[pageName];
    if (!pagePermissions) {
        console.error(`No matching page found for page: ${pageName} in module: ${moduleName}`);
        return null;
    }

    return pagePermissions;
}



