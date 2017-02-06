export default iconPath = (iconName) => {
	switch (iconName){
		case 'Pizza':
			return require('../../iconImages/Pizza.png');
		case 'Beer':
			return require('../../iconImages/Beer.png');
		case 'Food and wine':
			return require('../../iconImages/Food-and-wine.png');
		case 'Sushi':
			return require('../../iconImages/Sushi.png');
		default:
			return require('../../iconImages/Food-and-wine.png');
	}
};