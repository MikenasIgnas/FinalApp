const calculateVSD = (incomeValue:string) => {
    const nationalInsurance: number = (parseFloat(incomeValue) * 12.52) / 100;
    return nationalInsurance;
  };
export default calculateVSD;
