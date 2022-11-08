/* eslint-disable max-len */
import React from 'react';
import InputComponent from './InputComponent';

type InputContainerProps = {
    incomeValue:string
    rentValue:string
    taxesValue:string,
    className:string,
    onIncomeChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onRentChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onTaxesChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onError: boolean | undefined,
    helperText :string | false | undefined
    onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
};
const InputContainer:React.FC<InputContainerProps> = ({
 incomeValue,
 rentValue,
 taxesValue,
 onIncomeChange,
 onRentChange,
 onTaxesChange,
 className,
 onError,
 helperText,
 onBlur,
}) => (
  <div className="inputContainer">
    <div className="inputs">
      <InputComponent
        value={incomeValue}
        className={className}
        onChange={onIncomeChange}
        helperText={helperText}
        onBlur={onBlur}
        error={onError}
        name="incomeValue"
        placeholder="Enter your Income ammount"
        id="incomeInput"
        label="Income (Bruto)"
        type="number"
      >
        Income
      </InputComponent>
      <InputComponent
        className={className}
        label="Rent"
        value={rentValue}
        name="rentValue"
        placeholder="Enter your Rent Cost"
        id="rentCostInput"
        onChange={onRentChange}
        error={onError}
        helperText={helperText}
        onBlur={onBlur}
        type="number"
      >
        Rent
      </InputComponent>
      <InputComponent
        className={className}
        label="Taxes"
        value={taxesValue}
        name="taxesValue"
        placeholder="Enter your Tax ammount"
        id="taxesInput"
        onChange={onTaxesChange}
        error={onError}
        helperText={helperText}
        onBlur={onBlur}
        type="number"
      >
        Taxes
      </InputComponent>
    </div>
  </div>
  );

export default InputContainer;
