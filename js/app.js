/*
  Please add all Javascript code to this file.
  GA Iván R.
*/

$('#popUp').removeClass('hidden');

let title = '';
let subtitle = '';
let previewImageUrl = '';
let linkUrl = '';
let titleRank = '';
let content = '';


let redditUrl = 'https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/r/sanfrancisco.json';
$.get(redditUrl).then(function(response){
	response.data.children.forEach(function(element){
		title = element.data.title;
		subtitle = element.data.author;
		previewImageUrl = element.data.thumbnail;
			if(previewImageUrl === 'self'){
				previewImageUrl = 'https://i.imgur.com/OBB7tLg.gif';
			}
		linkUrl = element.data.url;
		titleRank = element.data.score;
		addContent(title, subtitle, previewImageUrl, titleRank, linkUrl);
		$('#popUp').addClass('hidden');
	})
})


function addContent(title, subtitle, previewImageUrl, titleRank, linkUrl){
	content += `
	      <article class="article">
            <section class="featuredImage">
              <img src="${previewImageUrl}" alt="" />
            </section>
            <section class="articleContent">
                <a href="#"><h3>${title}</h3></a>
                <h6>${subtitle}</h6>
            </section>
            <div id="linkUrl" class="hidden"><h3>${linkUrl}</h3></a></div>
            <section class="impressions">
              ${titleRank}
            </section>
            <div class="clearfix"></div>
          </article>
          `
    $('#main').html(content);
    addListeners();
}

function addListeners(){
	$('.articleContent').on('click',function(article){
		console.log(article);
		$('#popUp').removeClass('loader');
		$('#popUp').removeClass('hidden');
		$('#popUp h1').text(article.target.innerText);
		$('#popUp p').text(article.currentTarget.children[1].innerText);
		console.log(article.currentTarget.nextElementSibling.innerText);
		$('.popUpAction').attr('href', article.currentTarget.nextElementSibling.innerText);
		closePopUp();
	})	
}

function closePopUp(){
	$('.closePopUp').on('click',function(){
		console.log('exit');
		$('#popUp').addClass('hidden');
	})
}