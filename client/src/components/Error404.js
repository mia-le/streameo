import React from "react"

class Error404 extends React.Component {

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{fontSize: '2em', marginTop: '4em' }}>You turned a wrong corner..</h1>
                <img style={{ maxWidth: '600px', height: 'auto' }} alt="" src="https://error404.fun/img/full-preview/1x/5.png" />
            </div>
        )
    }

}

export default Error404