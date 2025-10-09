var links = document.querySelectorAll('.brands-catregory-list .item>a');
var content = document.querySelectorAll('.brands-content .content');
var lis = document.querySelectorAll('.brands-catregory-list .item');

for (let i = 0; i < links.length; i++){
	links[i].addEventListener('click', function(e){
    e.preventDefault();
		var activLinks = document.querySelector('.brands-catregory-list .item.activ');
		var activContent = document.querySelector('.brands-content .content.active');

		activLinks.classList.remove('activ');
		activContent.classList.remove('activ');

		this.classList.add('activ');
		var attr = this.getAttribute('href');

		var activ = document.querySelector(attr);

		activ.classList.add('activ');

        var lisLength = lis.length;
        var lisWidth = 100 / lisLength;
        var position = i*lisWidth;

	});
}