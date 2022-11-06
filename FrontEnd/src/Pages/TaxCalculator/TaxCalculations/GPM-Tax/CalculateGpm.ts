const calculateGPM = (incomeValue:string, NPDValue:string | number) => {
    const incomeTax: number = ((parseFloat(incomeValue) - Number(NPDValue)) * 20) / 100;
    return incomeTax;
  };

export default calculateGPM;
