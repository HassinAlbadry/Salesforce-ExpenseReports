public class ReportStatus {
    @AuraEnabled
    public static String approve (String id, Boolean approve){
        //get date and amount from query
        
          Expense_Report__c query= [SELECT Id, Date__c, Amount__c, Status__c FROM Expense_Report__c WHERE Id = :id ];
        //if approve button clicked
        if(approve == true){
            query.Status__c = 'Approved';
            update query; 
            return 'Report processed and Approved';

            
        }else {
            return 'Doesnt meet critiria to be approved';
       }
          
        
        
    } 
    
   @AuraEnabled
   public static String reject (String id, Boolean reject){
        
          Expense_Report__c query= [SELECT Id, Date__c, Amount__c, Status__c FROM Expense_Report__c WHERE Id = :id ];
        //if reject button clicked
        if(reject == true){
            
            query.Status__c = 'Rejected';
            update query; 
            return 'Report rejected';

            
        }else {
            return 'Doesnt meet critiria to be rejected';
        }
          
        
        
    } 

}