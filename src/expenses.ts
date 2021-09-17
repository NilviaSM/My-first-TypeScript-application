type Currency = 'CLP' | 'USD'; //Acá definimos las monedas u otras opciones que podriamos crear.

interface Price{ //Tipo de datos que se creo, basado en una interface, que esperará un numero de tipo number y una moneda de tipo Currency
    number:number,
    currency:Currency
}

interface ExpensesItem{ //espera que los objetos obtengan un tipo de dato

    id?:number,
    title:string,
    cost:Price
}

interface IExpenses{ //Permite crear tipo de datos, como los objetos
    expenses:ArrayList<ExpensesItem>,   //permite manejar una lista con objetos (como java)
    finalCurrency: Currency,
    add(item:ExpensesItem):boolean,
    get(index:number):ExpensesItem|null,
    getTotal():string,
    remove(id:number):boolean
}

class ArrayList<T>{ //Variable "T" => Es un generico

    private items:T[];

    constructor(){
        this.items =[];
    }

    add(item:T):void{
        this.items.push(item);
    }

    get(index:number):T|null{ 
        const item:T[] = this.items.filter((x:T, i:number) =>{
            return i == index;  //Resultado boolean que puede ser i o index
        });

        if(item.length==0){     
            return null;
        }else{
            return item[0];  //Regresa un unico elemento
        }
    }


createFrom(value:T[]):void{
   this.items = [...value] 
 }

 getAll():T[]{
     return this.items;
 }

}
class Expenses implements IExpenses{
    expenses: ArrayList<ExpensesItem>;
    finalCurrency: Currency;
    
    private count = 0;

    constructor(currency:Currency){
        this.finalCurrency = currency;
        this.expenses = new ArrayList<ExpensesItem>();
    }
    add(item: ExpensesItem): boolean {
        item.id= this.count
        this.count++;
        this.expenses.add(item);
        return true;
        
    }
    get(index:number): ExpensesItem | null {
       return this.expenses.get(index);
    }
    getItems():ExpensesItem[]{
        return this.expenses.getAll();
    }
    
    getTotal():string {
        const total = this.getItems().reduce((acc, item)=>{ //Regresa un arreglo acumulador e items
            return acc += this.convertCurrency(item, this.finalCurrency);
        },0);

        return `${this.finalCurrency} $${total.toFixed(2).toString()} ` ;
    }

    remove(id: number): boolean {
        throw new Error("Method not implemented.");
    } //controlador

    private convertCurrency(item:ExpensesItem, currency:Currency):number{
        switch(item.cost.currency){
            case 'USD':
                switch(currency){
                    case 'CLP':
                        return item.cost.number *783;
                        break

                        default:
                            return item.cost.number;
                    }
             break;

             case'CLP':
             switch(currency){
                case 'USD':
                    return item.cost.number /783;
                    break

                    default:
                        return item.cost.number;
                }
                break;
                default:
                    return 0;
        }

    }
}