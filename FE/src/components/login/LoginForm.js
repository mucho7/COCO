function LoginForm (params) {
    return (
        <form>
            <label>아이디</label>
            <input type="text"></input>

            <label>비밀번호</label>
            <input type="password"></input>

            <button className="submit"> 들어 오라우 </button>
        </form>
    )   
}

export default LoginForm