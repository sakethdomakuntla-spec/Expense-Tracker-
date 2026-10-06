// get to know the user(name)
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

// Collecting the past transaction Details from the localStorage
let CurrentBalance=0,Income=0,Expense=0,NoOfTransactions=0;
if(!localStorage.getItem("NoOfTransactions")){
    localStorage.setItem("NoOfTransactions","0");
}
else{
    NoOfTransactions=JSON.parse(localStorage.getItem("NoOfTransactions"));
}

let Transactions=[];
if(!localStorage.getItem("Transactions")){
    localStorage.setItem("Transactions","[]");
}
else{
    Transactions=JSON.parse(localStorage.getItem("Transactions"));
    Transactions.forEach((e) => {
        let Tblock=document.createElement("div");
        Tblock.innerHTML=`      <button>X</button>
                                <div class="transaction">
                                <div class="Tlogo"></div>
                                <div class="Tdetails">
                                    <div class="Tname"></div>
                                    <div class="Tdate"></div>
                                </div>
                                <div class="Tamount"></div>
                            </div>
                            <div class="line"></div>`
        
        Tblock.classList.add("transactionblock");
        Tblock.setAttribute("id",e["TID"]);
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
    let MaxAmount=Math.max(Income,Expense);
    CurrentBalance=Income-Expense;
    let ScaleAmount=1;
    while(Math.floor(MaxAmount)>0){
        MaxAmount=MaxAmount/10;
        ScaleAmount=ScaleAmount*10;
    }
    ScaleAmount=ScaleAmount/10;
    ScaleAmount=Math.max(ScaleAmount,1);
    for(let i=1;i<=10;i++){
        let x=ScaleAmount*(i-1)
        document.querySelector(`#v${i}`).innerHTML=`${x}`;
    }
    let IncomeBarHeight=Math.floor((Income*29)/ScaleAmount)
    document.querySelector(".incomebar").setAttribute("style",`height:${IncomeBarHeight}px`);
    let ExpenseBarHeight=Math.floor((Expense*29)/ScaleAmount);
    document.querySelector(".expensebar").setAttribute("style",`height:${ExpenseBarHeight}px`);
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

// code for Add Transaction
let isPresent=false;
let AddTransaction=document.querySelector("#Tbutton");
AddTransaction.addEventListener("click",()=>{
    if(!isPresent){
        isPresent=true;
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
            isPresent=false;
        })
        // code for extraction of data given by the user and displaying it
        let Tform=document.getElementById("Tform");
        Tform.addEventListener('submit',(event)=>{
            event.preventDefault();
            const formData= new FormData(event.target);
            const DataObj=Object.fromEntries(formData);
            const today=new Date();
            DataObj["date"]=`${today.getDate()} ${today.toLocaleString('default',{month:'long'})}`;
            NoOfTransactions=NoOfTransactions+1;
            localStorage.setItem("NoOfTransactions",`${NoOfTransactions}`);
            DataObj["TID"]=`${NoOfTransactions}`;
            Transactions=JSON.parse(localStorage.getItem("Transactions"))
            Transactions.push(DataObj);
            localStorage.setItem("Transactions",JSON.stringify(Transactions));
            let Tblock=document.createElement("div");
            Tblock.innerHTML=`      <button>X</button>
                                    <div class="transaction">
                                    <div class="Tlogo"></div>
                                    <div class="Tdetails">
                                        <div class="Tname"></div>
                                        <div class="Tdate"></div>
                                    </div>
                                    <div class="Tamount"></div>
                                </div>
                                <div class="line"></div>`
        
            Tblock.classList.add("transactionblock");
            Tblock.setAttribute("id",DataObj["TID"]);
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
            isPresent=false;

            MaxAmount=Math.max(Income,Expense);
            ScaleAmount=1;
            while(Math.floor(MaxAmount)>0){
                MaxAmount=MaxAmount/10;
                ScaleAmount=ScaleAmount*10;
            }
            ScaleAmount=ScaleAmount/10;
            ScaleAmount=Math.max(ScaleAmount,1);
            for(let i=1;i<=10;i++){
                let x=ScaleAmount*(i-1)
                document.querySelector(`#v${i}`).innerHTML=`${x}`;
            }
            IncomeBarHeight=Math.floor((Income*29)/ScaleAmount)
            document.querySelector(".incomebar").setAttribute("style",`height:${IncomeBarHeight}px`);
            ExpenseBarHeight=Math.floor((Expense*29)/ScaleAmount);
            document.querySelector(".expensebar").setAttribute("style",`height:${ExpenseBarHeight}px`);
        })
    }
})

// code for deleting a Transaction 
document.querySelector(".transactions").addEventListener("click",(event)=>{
    if(event.target.tagName==="BUTTON"){
        let Tnode=event.target.parentElement;
        let low=0,high=Transactions.length-1;
        while(low<=high){
            let mid=low+(high-low)/2;
            if(JSON.parse(Transactions.at(mid)["TID"])==JSON.parse(Tnode.id)){
                if(Transactions.at(mid)["method"]==="Income"){
                    Income=Income-JSON.parse(Transactions.at(mid)["amount"]);
                }
                else{
                    Expense=Expense-JSON.parse(Transactions.at(mid)["amount"]);
                }
                Transactions.splice(mid,1);
                localStorage.setItem("Transactions",JSON.stringify(Transactions));
                break;
            }
            else if(JSON.parse(Transactions.at(mid)["TID"])<JSON.parse(Tnode.id)){
                low=mid+1;
            }
            else{
                high=mid-1;
            }
        }
        CurrentBalance=Income-Expense;
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
        MaxAmount=Math.max(Income,Expense);
        ScaleAmount=1;
        while(Math.floor(MaxAmount)>0){
            MaxAmount=MaxAmount/10;
            ScaleAmount=ScaleAmount*10;
        }
        ScaleAmount=ScaleAmount/10;
        ScaleAmount=Math.max(ScaleAmount,1);
        for(let i=1;i<=10;i++){
            let x=ScaleAmount*(i-1)
            document.querySelector(`#v${i}`).innerHTML=`${x}`;
        }
        IncomeBarHeight=Math.floor((Income*29)/ScaleAmount)
        document.querySelector(".incomebar").setAttribute("style",`height:${IncomeBarHeight}px`);
        ExpenseBarHeight=Math.floor((Expense*29)/ScaleAmount);
        document.querySelector(".expensebar").setAttribute("style",`height:${ExpenseBarHeight}px`);
        Tnode.remove();
    }
})