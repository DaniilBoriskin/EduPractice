// eslint-disable-next-line no-unused-vars
class User{
	constructor(login = '', password = '', name = '', photo = ''){
		this.login = login;
		this.password = password;
		this.name = name;
		this.photo = photo;
	}
    
	static parseUser(user){
        return (new User(user.login,user.password,user.name,user.photo));
    }
    
}