import './styles.css';

const Loading = ({ size, color }) => {
    return (
        <div className='loader-container'>
            <span className="loader" style={{ width: size, height: size, borderBottomColor: color }}></span>
        </div>
    );
}

export default Loading;