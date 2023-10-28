import style from './Avatart.module.scss';
function Avatart({ src, alt, type }) {
    // console.log(src);
    return (
        <div>
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className={type === 'avart' ? style.avatart : style.default}
                    // width={100} height={100}
                />
            ) : (
                <img
                    src="https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                    alt="avatar"
                    className={type === 'avart' ? style.avatartDefault : style.default}
                    // width={100}
                    // height={100}
                />
            )}
        </div>
    );
}

export default Avatart;
