const setPermissions = (
  setFormDetails,
  writePermissions,
  checked,
  value,
  setPermitSub,
  setIsViewLocked,
  cluster
) => {
  setFormDetails((prevDetails) => {
    let updatedPermissions = checked
      ? [...prevDetails.permissions, value]
      : prevDetails.permissions.filter((perm) => perm !== value);

    const hasWritePermission = writePermissions.some((perm) =>
      updatedPermissions.includes(perm)
    );

    // Automatically add view permission if a write permission is checked
    if (writePermissions.includes(value) && checked) {
      updatedPermissions.push(cluster);
    }

    // If all write permissions are gone and the view was added automatically, remove it
    if (!hasWritePermission) {
      updatedPermissions = updatedPermissions.filter(
        (perm) => perm !== cluster
      );
    }

    // Remove duplicates
    updatedPermissions = [...new Set(updatedPermissions)];

    setPermitSub(updatedPermissions.includes(cluster));
    setIsViewLocked(hasWritePermission);

    return {
      ...prevDetails,
      permissions: updatedPermissions,
    };
  });
};

export default setPermissions;
