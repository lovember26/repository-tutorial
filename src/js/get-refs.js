export default function getRefs() {
  return {
    newsGalery: document.querySelector('.news-gallery'),
    favorite: document.querySelector('.news-favorite'),
    iconFavorite: document.querySelector('.news-favorite__icon'),
    readed: document.querySelector('.card__infotion__more')
  };
}