import Header from "../components/Header";

const PageNotFound = () => {
  const style = {
    textAlign: 'center',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <>
      <Header />
      <div style={style}>
        <h1>Error 404.</h1>
        <p>Page not found. D:</p>
      </div>
    </>
  )
}

export default PageNotFound;