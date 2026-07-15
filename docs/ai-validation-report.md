\# AI Inventory Prediction Validation



\## Prediction Formula



Days Remaining = Current Stock / Average Daily Usage



\## Test Case 1



Item: AI Test Chicken  

Current Stock: 20  

Daily Usage: 5  

Expected Days: 4  

Actual Days: 4  

Expected Recommendation: Reorder Immediately  

Actual Recommendation: Reorder Immediately  

Status: Passed



\## Test Case 2



Item: AI Test Rice  

Current Stock: 80  

Expected Daily Usage: 10  

Actual Daily Usage: 5  

Expected Days: 8  

Actual Days: 16  

Expected Recommendation: Plan Reorder  

Actual Recommendation: Stock Sufficient  

Status: Failed



Reason: Current prediction logic uses a fixed daily usage value of 5.



\## Test Case 3



Item: AI Test Oil  

Current Stock: 100  

Daily Usage: 5  

Expected Days: 20  

Actual Days: 20  

Expected Recommendation: Stock Sufficient  

Actual Recommendation: Stock Sufficient  

Status: Passed



\## Edge Cases



Zero Stock: Handled  

Missing Data: Handled with 422 Validation Error  

Very Large Stock: Handled  

Negative Stock: Validation Required  

Zero Daily Usage: Not Testable with Current Fixed Daily Usage Logic



\## Analytics Validation



Sales Analytics: Passed  

Revenue Analytics: Passed  

Top Items Analytics: Passed  

Order Analytics: Passed  

Inventory Analytics: Passed



\## Authentication and API Validation



Duplicate Email: 400 Bad Request  

Wrong Password: 401 Unauthorized  

Invalid User: 401 Unauthorized  

Invalid Restaurant ID: 404 Not Found  

Invalid Menu ID: 404 Not Found  

Invalid Inventory ID: 404 Not Found



\## Final QA Result



Backend APIs passed final validation.



Two prediction-related improvements were identified:



1\. Daily usage is currently fixed at 5 and should support item-specific average daily usage.

2\. Negative inventory quantities should be rejected through schema validation.

