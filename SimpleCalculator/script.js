class Calculator {
    constructor(prevTextElem, currTextElem) {
        this.prevTextElem = prevTextElem
        this.currTextElem = currTextElem
        this.numkeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        this.operationkeys = ['+', '-', '*', '/', 'Enter']
        this.clear()
    }
    clear() {
        this.prevText = ''
        this.currText = ''
        this.operation = undefined
    }
    delete() {
        this.currText = this.currText.slice(0, -1)
    }
    appendNumber(num) {
        if(num === '.' && this.currText.includes('.'))
            return
        if(this.currText.toString().length > 14)   return
        this.currText = this.currText.toString()+num.toString()
    }
    appendOperation(oper) {
        if(this.currText == '')
            return
        if(this.prevText != '') 
            this.compute()
        this.prevText = this.currText
        this.currText = ''
        this.operation = oper
    }
    compute() {
        let ans
        const prev = parseFloat(this.prevText)
        const curr = parseFloat(this.currText)
        if(isNaN(prev) || isNaN(curr))
            return
        switch(this.operation) {
            case '+':
                ans = prev+curr
                break
            case '-':
                ans = prev-curr
                break
            case '*':
                ans = prev*curr
                break
            case '/':
                ans = prev/curr
                ans = Math.round(ans*10e12)/10e12
                break
            default:
                return
        }
        this.currText = ans
        this.operation = undefined
        this.prevText = ''
    }
    onKeyUp(keyPressed) {
        const keyName = keyPressed.key
        if(this.numkeys.includes(keyName)) {
            this.appendNumber(keyName)
            this.display()
        }
        if(this.operationkeys.includes(keyName)) {
            if(keyName == 'Enter') {
                this.compute()
                this.display()
            }
            else {
                this.appendOperation(keyName)
                this.display()
            }
        }
        if(keyPressed.keyCode == 8)
            this.delete()
    }
    display() {
        this.currTextElem.innerText = this.currText
        if(this.operation != undefined)
            this.prevTextElem.innerText = this.prevText+" "+this.operation
        else
            this.prevTextElem.innerText = this.prevText
    }
}

const nums = document.querySelectorAll('[data-num]')
const operations = document.querySelectorAll('[data-oper]')
const equalBtn = document.querySelector('[data-equal]')
const deleteBtn = document.querySelector('[data-del]')
const clearBtn = document.querySelector('[data-clear]')
const prevTextElem = document.querySelector('[data-prev]')
const currTextElem = document.querySelector('[data-curr]')


const calculator = new Calculator(prevTextElem, currTextElem)

nums.forEach(btn => {
    btn.addEventListener('click', ()=>{
        calculator.appendNumber(btn.innerText)
        calculator.display()
    })
})

operations.forEach(btn => {
    btn.addEventListener('click', ()=>{
        calculator.appendOperation(btn.innerText)
        calculator.display()
    })
})

equalBtn.addEventListener('click', btn => {
    calculator.compute()
    calculator.display()
})

clearBtn.addEventListener('click', btn => {
    calculator.clear()
    calculator.display()
})

deleteBtn.addEventListener('click', btn => {
    calculator.delete()
    calculator.display()
})

document.body.addEventListener('keypress', function(pressedKey) {
    console.log(pressedKey.key);
    console.log(pressedKey.code);
    calculator.onKeyUp(pressedKey)
});