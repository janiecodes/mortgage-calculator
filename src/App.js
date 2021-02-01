
import './App.css';
import Header from './Header'
import {useState} from 'react'

const App = () => {
// const [amount, setAmount] = useState('')
// const [interest, setInterest] = useState('')
// const [term, setTerm] = useState('')

const [values, setValues] = useState({
  amount: '',
  interest: '',
  term: '',
})

const [results, setResults] = useState({
  monthlyPayment: '',
  totalBalance: '',
})

const handleInputChange = (event) => 
  setValues({...values, [event.target.name]: event.target.value})

const handleSubmitValues = (e) => {
  e.preventDefault();
  calculateResults(values)
}


const calculateResults=({amount, interest, term}) => {

  const r = Number(interest * 0.01) / 12;
  const n = Number(term) * 12;
  const p = Number(amount);

  if (!amount || !interest || !term){
    return { balance: 0, pmt: 0 }; 
  } else{
    const balance = ((r * p * n) / (1 - Math.pow(1 + r, -n))).toFixed(2);
    const pmt = (balance / n).toFixed(2);
    setResults({
          totalBalance: balance,
          monthlyPayment: pmt,
        })

  }

}

  return (

    <div>
      <Header/>
      <div className='calculator'>
        <form onSubmit={handleSubmitValues}>

        
        <div className='amount'>Amount
        <input 
        className='input-amount'
        value={values.amount}
        onChange={handleInputChange}
        name='amount'
        type='number'
        />
        </div>
        
        <div className='interest-rate'>Interest Rate
        <input 
        className='interest-amount'
        value={values.interest}
        onChange={handleInputChange}
        name='interest'
        type='number'
        />
        </div>
        <div className='term'>Term
        <input 
        className='term-amount'
        value={values.term}
        onChange={handleInputChange}
        name='term'
        type='number'
        />
</div>
      <div className='btn'>
      <input 
      type='submit' 
      className='button'
      placeholder='Calculate'/>
      </div>

      <div className='total'>
        <div className='balance'>Total Balance: {results.totalBalance}</div>
        <div className='payment'>Monthly Payment: {results.monthlyPayment}</div>
      </div>
      </form>
    </div>
    </div>
  );
}

export default App;
