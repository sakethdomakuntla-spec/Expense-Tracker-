function setuser(){
    let name=prompt("Enter Your name");
    if(!name){
        setuser();
    }
    else{
        localStorage.setItem("name",name);
    }
    let NameHeading=document.querySelector("#heading");
    NameHeading.textContent=`WELCOME! ${name}`;
    
}
let heading=document.querySelector("#heading");
if(!localStorage.getItem("name")){
    setuser();
}
else{
    heading.textContent=`WELCOME! ${localStorage.getItem("name")}`;
}

let CurrentBalance=0,Income=0,Expense=0;
let Transactions=[];
if(!localStorage.getItem("Transactions")){
    localStorage.setItem("Transactions","[]");
}
else{
    Transactions=JSON.parse(localStorage.getItem("Transactions"));
    Transactions.forEach((e) => {
        let Tblock=document.createElement("div");
        Tblock.innerHTML=`      <div class="transaction">
                                <div class="Tlogo"></div>
                                <div class="Tdetails">
                                    <div class="Tname"></div>
                                    <div class="Tdate"></div>
                                </div>
                                <div class="Tamount"></div>
                            </div>
                            <div class="line"></div>`
        
        Tblock.classList.add("transactionblock");
        Tblock.querySelector(".Tlogo").innerHTML=`${e["description"].at(0)}`;
        Tblock.querySelector(".Tname").innerHTML=e["description"]; 
        Tblock.querySelector(".Tdate").innerHTML=e["date"];
        if(e["method"]==="Income"){
            Tblock.querySelector(".Tamount").classList.add("green");
            Tblock.querySelector(".Tamount").innerHTML="+$"+e["amount"];
            Income=Income+JSON.parse(e["amount"]);
        }
        else{
            Tblock.querySelector(".Tamount").classList.add("red");
            Tblock.querySelector(".Tamount").innerHTML="-$"+e["amount"];
            Expense=Expense+JSON.parse(e["amount"]);
        }
        document.querySelector(".transactions").append(Tblock);
    });
    CurrentBalance=Income-Expense;
}
document.querySelector(".inamount").innerHTML=`+$${Income}`;
document.querySelector(".examount").innerHTML=`-$${Expense}`;
if(CurrentBalance>=0){
    document.querySelector(".cbamount").innerHTML=`$ ${CurrentBalance}`;
    if(document.querySelector(".cbamount").classList.contains("red")){
        document.querySelector(".cbamount").classList.remove("red");
    }
}
else{
    document.querySelector(".cbamount").innerHTML=`-$ ${Math.abs(CurrentBalance)}`;
    document.querySelector(".cbamount").classList.add("red");
}

let AddTransaction=document.querySelector("#Tbutton");
AddTransaction.addEventListener("click",()=>{
    let TransactionForm=document.createElement("div");
    TransactionForm.innerHTML=`<div class="cancel">
                    <input type="button" value="X" id="cancelform">
                </div>
                <form action="" method="get" id="Tform">
                    <div id="formfirstdiv">
                        <label for="amount">Amount</label>
                        <input type="text" placeholder="Enter amount" required name="amount" id="amount">
                    </div>
                        <div id="formseconddiv">
                            <input type="radio" name="method" value="Income" id="Income" required><label for="Income">Income </label>
                            <input type="radio" name="method" value="Expense" id="Expense" required><label for="Expense">Expense</label>
                        </div>
                        <div id="formthirddiv">
                            <input type="text" placeholder="Transaction description" name="description" required>
                        </div>
                        <button type="submit" id="submit">submit</button>
                </form>`;
    TransactionForm.classList.add("transactionform");
    document.querySelector("main").append(TransactionForm);

    let cancelform=document.querySelector("#cancelform");
    cancelform.addEventListener("click",()=>{
        TransactionForm.remove();
    })

    let Tform=document.getElementById("Tform");
    Tform.addEventListener('submit',(event)=>{
        event.preventDefault();
        const formData= new FormData(event.target);
        const DataObj=Object.fromEntries(formData);
        const today=new Date();
        DataObj["date"]=`${today.getDate()} ${today.toLocaleString('default',{month:'long'})}`
        Transactions=JSON.parse(localStorage.getItem("Transactions"))
        Transactions.push(DataObj);
        localStorage.setItem("Transactions",JSON.stringify(Transactions));
        let Tblock=document.createElement("div");
        Tblock.innerHTML=`      <div class="transaction">
                                <div class="Tlogo"></div>
                                <div class="Tdetails">
                                    <div class="Tname"></div>
                                    <div class="Tdate"></div>
                                </div>
                                <div class="Tamount"></div>
                            </div>
                            <div class="line"></div>`
        
        Tblock.classList.add("transactionblock");
        Tblock.querySelector(".Tlogo").innerHTML=`${DataObj["description"].at(0)}`;
        Tblock.querySelector(".Tname").innerHTML=DataObj["description"]; 
        Tblock.querySelector(".Tdate").innerHTML=DataObj["date"];
        if(DataObj["method"]==="Income"){
            Tblock.querySelector(".Tamount").classList.add("green");
            Tblock.querySelector(".Tamount").innerHTML="+$"+DataObj["amount"];
            Income=Income+JSON.parse(DataObj["amount"]);
            document.querySelector(".inamount").innerHTML=`+$${Income}`;
        }
        else{
            Tblock.querySelector(".Tamount").classList.add("red");
            Tblock.querySelector(".Tamount").innerHTML="-$"+DataObj["amount"];
            Expense=Expense+JSON.parse(DataObj["amount"]);
            document.querySelector(".examount").innerHTML=`-$${Expense}`;
            CurrentBalance=Income-Expense;
            document.querySelector(".cbamount").innerHTML=`$${CurrentBalance}`;
        }
        CurrentBalance=Income-Expense;
        if(CurrentBalance>=0){
            document.querySelector(".cbamount").innerHTML=`$ ${CurrentBalance}`;
            if(document.querySelector(".cbamount").classList.contains("red")){
                document.querySelector(".cbamount").classList.remove("red");
            }
        }
        else{
            document.querySelector(".cbamount").innerHTML=`-$ ${Math.abs(CurrentBalance)}`;
            document.querySelector(".cbamount").classList.add("red");
        }
        document.querySelector(".transactions").append(Tblock);
        TransactionForm.remove();
    })

})