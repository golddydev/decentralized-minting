const parseHandleUtf8Name = (
  handleName: string
): {
  isSubHandle: boolean;
  rootHandleName: string;
  subHandleName: string;
  handleName: string;
} => {
  const [subHandleName, rootHandleName] = handleName.split("@");

  if (!rootHandleName) {
    return {
      isSubHandle: false,
      rootHandleName: "",
      subHandleName: "",
      handleName,
    };
  }

  return {
    isSubHandle: true,
    rootHandleName,
    subHandleName,
    handleName,
  };
};

export { parseHandleUtf8Name };
