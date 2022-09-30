import React from 'react'
import Request from '../request/Request';
import CustomerProfile from './CustomerProfile'

const CustomerPage = ({loginId}) => {
    const styles = {
        app: {
        flex: 4, // the number of columns you want to devide the screen into
        // marginHorizontal: "10rem",
        width: 400,
        backgroundColor: "red",
        flexDirection: "row"
    },
    row: {
    flexDirection: "row"
  }
};
  return (
    <section >
        
        <Request />

        <CustomerProfile loginId={loginId}/>
    </section>
  )
}

export default CustomerPage