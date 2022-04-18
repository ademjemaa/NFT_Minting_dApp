
## @elrondnetwork/dapp-utils react package

This module contains a collection of react components and helper functions commonly used when developing DApps.

**Installation:**

    npm i @elrondnetwork/dapp-utils

## Components
**Denominate**
Displays a denominated value along with its label

Usage:

    import { UI } from  "@elrondnetwork/dapp-utils";
    const yourComponent = () => {
		
		return (
		<>
			...
			<UI.Denominate ...params />
		</>
		)
    }
Params:
| Name | type | required | default | Description |
| :---: | :---: | :---: | :---: | :---: |
| **value** | string | **yes** | - | Value that needs to be denominated |
| **showLastNonZeroDecimal** | boolean | no | false |  Shows the last non zero decimal |
| **showLabel** | boolean | no | true | Shows the default label |
| **erdLabel** | string | no | EGLD | Overrides the default label |
| **token** | string | no | - | Overrides the erdLabel, used for ESDT Tokens |
| **decimals** | number | no | 4 | Specifies how many decimals should be displayed |
| **denomination** | number | no | 18 | Specifies how much to denominate by |


## Validations
**stringIsFloat**
Checks if a string is float. 

Usage:

    import { validation } from  "@elrondnetwork/dapp-utils";
    
    validation.stringIsFloat("100.3423");
    
Params:
| Name | type | required | default | Description |
| :---: | :---: | :---: | :---: | :---: |
| **amount** | string | **yes** | - | Amount that needs to be checked |


**Returns boolean**

<br><br><br>

**stringIsInteger**
Checks if a string is integer

Usage:

    import { validation } from  "@elrondnetwork/dapp-utils";
    
    validation.stringIsInteger("100");
    
Params:
| Name | type | required | default | Description |
| :---: | :---: | :---: | :---: | :---: |
| **amount** | string | **yes** | - | Amount that needs to be checked |


**Returns boolean**


## Operations
**nominate(input, customDenomination)**
Nominates a provided value

Usage:

    import { operations } from  "@elrondnetwork/dapp-utils";
    
    operations.nominate("10");
    
Params:
| Name | type | required | default | Description |
| :---: | :---: | :---: | :---: | :---: |
| **input** | string  | **yes** | - | Value that needs to be nominated|
| **customDenomination** | number | no | 18 | Custom denomination value |


**Returns string**

<br><br><br>

**denominate(input, denomination, decimals, showLastNonZeroDecimals)**
Denominates a provided value

Usage:

    import { operations } from  "@elrondnetwork/dapp-utils";
    
    operations.denominate({input: "10000000000000000000000", decimals: 4});
    
Params:
| Name | type | required | default | Description |
| :---: | :---: | :---: | :---: | :---: |
| **input** | string  | **yes** | - | Value that needs to be denominated|
| **denomination** | number | **yes** | - | Denomination value |
| **decimals** | number | **yes** | - | Specifies how many decimals should be displayed|
| **showLastNonZeroDecimals** | boolean | no | false | Shows the last non zero decimal |
| **addCommas** | boolean | no | true | Formats the number with commas |



**Returns string**



**getTokenFromData(data)**
Nominates a provided value

Usage:

    import { operations } from  "@elrondnetwork/dapp-utils";
    
    operations.getTokenFromData("ESDTTransfer@425553442d663361616361@0de0b6b3a7640000");
    
Params:
| Name | type | required | default | Description |
| :---: | :---: | :---: | :---: | :---: |
| **data** | string  | **yes** | - | string representing operation and Hex ecoded values of token and amount|



**Returns data** {
tokenId: string;
nominatedTokenAmount: string
}

<br><br><br>

