
// document.getElementById('record').addEventListener('click', function() {
    function recordData(event) {
        event.preventDefault(); 

    var promoType = document.getElementById('promoType').value;
    var amount = document.getElementById('amount').value;
    
    localStorage.setItem('promoType', promoType);
    localStorage.setItem('amount', amount);
    

     document.getElementById('dataForm').reset();
    }
    window.location.href = "file:///C:/Users/HP/Documents/new%20aaa/store/record.html";



document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    document.getElementById('dataForm').addEventListener('submit', recordData);
    recordData();
})

