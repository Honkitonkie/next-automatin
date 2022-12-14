import Link from "next/link";

const Form = ({ isLogin, errorMessage, succesMessage, onSubmit }) => (
  <div>
    {isLogin ? <h1 className='md:w-1/2 mx-auto my-10 text-3xl'>Log in</h1> : <h1 className='md:w-1/2 mx-auto my-10 text-3xl'>Schrijf je in</h1>}
    <form className='md:w-1/2 mx-auto flex-col' onSubmit={onSubmit}>
      {!isLogin && (
        <label>
          <span>Naam</span>
          <input
            pattern='[^()/><\][\\\x22,;|]+'
            title='Voor de veiligheid van jouw gegevens accepteren wij geen brackets, haken of slashes in dit veld'
            autoComplete='name'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6'
            type='text'
            name='username'
          />
        </label>
      )}
      <label>
        <span>Email</span>
        <input
          autoComplete='email'
          pattern='[^()/><\][\\\x22,;|]+'
          title='Voor de veiligheid van jouw gegevens accepteren wij geen brackets, haken of slashes in dit veld'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6'
          type='email'
          name='email'
          required
        />
      </label>
      {!isLogin && (
        <label>
          <span>Bedrijfsnaam</span>
          <input
            autoComplete='company'
            pattern='[^()/><\][\\\x22,;|]+'
            title='Voor de veiligheid van jouw gegevens accepteren wij geen brackets, haken of slashes in dit veld'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6'
            type='text'
            name='company'
          />
        </label>
      )}
      <label>
        <span>Wachtwoord</span>
        <input
          autoComplete='current-password'
          pattern='[^()/><\][\\\x22,;|]+'
          title='Voor de veiligheid van jouw gegevens accepteren wij geen brackets, haken of slashes in dit veld'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6'
          type='password'
          name='password'
          required
        />
      </label>
      {!isLogin && (
        <label>
          <span>Herhaal wachtwoord</span>
          <input
            pattern='[^()/><\][\\\x22,;|]+'
            title='Voor de veiligheid van jouw gegevens accepteren wij geen brackets, haken of slashes in dit veld'
            autoComplete='repeat-password'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6'
            type='password'
            name='rpassword'
            required
          />
        </label>
      )}

      <div className='flex justify-between items-center'>
        {isLogin ? (
          <>
            <Link href='/signup'>
              <a className='italic'>Ik heb nog geen account</a>
            </Link>
            <button
              className='focus:outline-none text-white bg-automatin-blue hover:bg-white hover:text-automatin-blue hover:ring-1 hover:ring-automatin-blue focus:ring-4 focus:ring-automatin-grey font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-automatin-blue dark:focus:ring-grey-300'
              type='submit'
            >
              Inloggen
            </button>
          </>
        ) : (
          <>
            <Link href='/login'>
              <a className='italic'>Ik heb al een account</a>
            </Link>
            <button
              className='focus:outline-none text-white bg-automatin-blue hover:bg-white hover:text-automatin-blue hover:ring-1 hover:ring-automatin-blue focus:ring-4 focus:ring-automatin-grey font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-automatin-blue dark:focus:ring-grey-300'
              type='submit'
            >
              Registreren
            </button>
          </>
        )}
      </div>

      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      {succesMessage && <p className='text-green-500'>{succesMessage}</p>}
    </form>
  </div>
);

export default Form;
