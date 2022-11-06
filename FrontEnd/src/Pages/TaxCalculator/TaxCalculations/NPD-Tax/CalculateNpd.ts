import minimalWage from '../../minimalWage';

const calculateNPD = (incomeValue:string) => {
  if (parseFloat(incomeValue) < minimalWage) {
    return 540;
  }
  if (parseFloat(incomeValue) > 2864.2) {
    return 0;
  }
    if (parseFloat(incomeValue) > minimalWage) {
      if (parseFloat(incomeValue) <= 1704) {
        const NPD:number = 540 - 0.34 * (parseFloat(incomeValue) - 730);
        return NPD;
      }
      if (parseFloat(incomeValue) > 1704) {
        const NPD:number = 400 - 0.18 * (parseFloat(incomeValue) - 642);
        return NPD;
      }
    }
    return incomeValue;
  };

  export default calculateNPD;
