import calculateGPM from '../TaxCalculations/GPM-Tax/CalculateGpm';
import calculateNPD from '../TaxCalculations/NPD-Tax/CalculateNpd';
import calculateRent from '../TaxCalculations/RENT-Tax/CalculateRent';
import calculateSDR from '../TaxCalculations/SDR-Tax/CalculateSdr';
import calculateUtilityTaxes from '../TaxCalculations/UTILITY-Tax/CalculateUtilities';
import calculateVSD from '../TaxCalculations/VSD-Tax/CalculateVsd';

export type TaxesProps = {
    incomeValue:string,
    rentValue:string
    taxesValue:string
  };
  const calcultateTaxes = ({ incomeValue, rentValue, taxesValue }:TaxesProps) => {
    const NPD = calculateNPD(incomeValue);
    const GPM = calculateGPM(incomeValue, NPD);
    const SDR = calculateSDR(incomeValue);
    const VSD = calculateVSD(incomeValue);
    const RENT = calculateRent(rentValue);
    const UTILITY = calculateUtilityTaxes(taxesValue);
    const PAYEDAMMOUNT = (GPM + SDR + VSD + RENT + UTILITY);
    const TOTALLEFT = Number(incomeValue) - (GPM + SDR + VSD + RENT + UTILITY);
    return [NPD, GPM, SDR, VSD, RENT, UTILITY, PAYEDAMMOUNT, TOTALLEFT];
  };
export default calcultateTaxes;
