import styled from 'styled-components'

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-dark {
    display: grid;
    grid-template-columns: 1fr;
    background-color: darkgray;
  }

  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
    
    
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-dark {
      grid-template-columns: auto 1fr;
      background-color: darkgray;
    }
    
    .dashboard-page {
      width: 90%;
    }
  }
`
export default Wrapper
