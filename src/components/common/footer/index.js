import {
    FaGithub,
    FaFacebook,
    FaTwitter,
} from 'react-icons/fa';

function Footer() {
    return (
        <footer className="custom-footer">
            <div className="footer-content">
                <div className="description">
                    <p>Created By: <span className="author">Surajan Shrestha</span></p>
                </div>
                <div className="social-icons">
                    <a className="github" href="https://github.com/SurajanShrestha" target="_blank" rel="noreferrer"><FaGithub className='mx-2' /></a>
                    <a className="facebook" href="https://www.facebook.com/surajan.shrestha.77" target="_blank" rel="noreferrer"><FaFacebook className='mx-2' /></a>
                    <a className="twitter" href="https://twitter.com/JustSurajan" target="_blank" rel="noreferrer"><FaTwitter className='mx-2' /></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
