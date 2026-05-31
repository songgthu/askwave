import Logo from '../images/AskWaveLogo.png'

const About = () => {
    return(
        <div className="about">
            <div className="LogoContainer">
                <img src={Logo} className="Logo" style={{ width: '200px', height: '200px' }} alt="AskWave logo" />
            </div>
            <h1>Welcome to AskWave!</h1>
            <p>Empower your university journey with AskWave, where students connect, learn, and thrive together.</p>
        </div>
    )
}
 
export default About;
