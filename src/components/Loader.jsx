import './loader.css'

const Loader = ({title}) => (
  <div className=' w-full flex justify-center items-center '>
    <div className='lds-ripple'>
      <div></div>
      <div></div>
    </div>
    <h1 className='text-2xl text-white mt-2'>{title}</h1>
  </div>
)

export default Loader
