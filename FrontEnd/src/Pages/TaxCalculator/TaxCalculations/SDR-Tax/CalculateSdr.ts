const calculateSDR = (incomeValue:string) => {
    const healthInsurance: number = (parseFloat(incomeValue) * 6.98) / 100;
    return healthInsurance;
  };
export default calculateSDR;
