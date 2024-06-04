public class Reports {
    
      @AuraEnabled(cacheable=true)
    public static List<Expense_Report__c> getAllReports (){
         
        //get all reports from Expense_Report__c object 

        return  [SELECT Name,Amount__c,Date__c,Status__c FROM Expense_Report__c ];
       

}
          @AuraEnabled(cacheable=true)

    public static List<Expense_Report__c> getSingleReport (String searchKey){
        //get single report by name search from Expense_Report__c object 
        

        return  [SELECT Name,Amount__c,Date__c,Status__c FROM Expense_Report__c WHERE Name = :searchKey ];
       

}
              @AuraEnabled(cacheable=true)

    public static List<Expense_Report__c> viewModalId (String id){
        //search record by id to view in modal
        return  [SELECT Name,Amount__c,Date__c,Status__c FROM Expense_Report__c WHERE Id = :id ];
       

}
}