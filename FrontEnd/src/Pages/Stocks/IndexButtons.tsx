import { Button } from '@mui/material';
import React from 'react';

type ButtonProps = {
    setIndexName: React.Dispatch<React.SetStateAction<string>>
    indexName:string | undefined,
    setStockName: React.Dispatch<React.SetStateAction<string | null | undefined>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
    setChangeValue: React.Dispatch<React.SetStateAction<boolean>>
    setEtfName: React.Dispatch<React.SetStateAction<string>>

};
const IndexButtons = ({
 indexName, setIndexName, setStockName, setCategory, setChangeValue, setEtfName,
}:ButtonProps) => {
    const handleIndexChange = () => {
        if (indexName === 'S&P 500') {
            setChangeValue(false);
                setIndexName('SPY');
                setStockName(indexName);
                setCategory('Index');
                setEtfName('SPY');
            }

        if (indexName === 'Nasdaq 100') {
                setChangeValue(false);
                setIndexName('QQQ');
                setStockName(indexName);
                setCategory('Index');
                setEtfName('QQQ');
            }
    };

    return (
      <Button variant="outlined" onClick={handleIndexChange}>{indexName}</Button>
        );
};

export default IndexButtons;
