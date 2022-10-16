


let pagElements = {
    search: "#search",
    matchIndex: 1,
    itemCoverBox: "tbody",
    product: "tr",
    itemPerPage: 10,
    pageCoverBox: ".pagination"
  };
  function pagination(ele){
    var tbody = document.querySelector(`${ele.itemCoverBox}`);
    var pageUl = document.querySelector(`${ele.pageCoverBox}`);
    var index = 1;
    var emptyBox = [];
    var itemPerPage = ele.itemPerPage;
    var tr = tbody.querySelectorAll(`${ele.product}`);
    var search = document.querySelector(`${ele.search}`);
    var searchItem = ele.matchIndex;

    for(let i=0; i<tr.length; i++){
       emptyBox.push(tr[i]);
    }


    function displayPage(itemPerPage){
      tbody.innerHTML = '';
      for(let i=0; i<itemPerPage; i++){
        tbody.appendChild(emptyBox[i]);
      }

    }
    displayPage(itemPerPage);
    function pageGenerator(x){
      const totalItem = emptyBox.length;
      const num_Of_Page = Math.ceil(totalItem/x);
      for(i=1; i<=num_Of_Page; i++){
        const li = document.createElement('li'); li.className = 'list';
        const a =document.createElement('a'); a.href = '#'; a.innerText = i;
        a.setAttribute('data-page', i);
        li.appendChild(a);
        pageUl.insertBefore(li,pageUl.querySelector('.next'));
      }
      
    }
    pageGenerator(itemPerPage);

    var pageLink = pageUl.querySelectorAll("a");
    var lastPage =  pageLink.length - 2;
    for(button of pageLink){
      button.onclick = pageDisplay;
    }
    function pageDisplay(){
      const page_num = this.getAttribute('data-page');
      const page_mover = this.getAttribute('id');
      if(page_num != null){
        index = page_num;
      }else{
        if(page_mover === "next"){
          index++;
          if(index >= lastPage){
            index = lastPage;
          }
        }else{
          index--;
          if(index <= 1){
            index = 1;
          }
        }
      }
      pageMaker(index, itemPerPage);
    }

    var pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
    function pageMaker(index, item_per_page){
      const start = item_per_page * index;
      const end  = start + item_per_page;
      const current_page =  emptyBox.slice((start - item_per_page), (end-item_per_page));
      tbody.innerHTML = "";
      
      for(let i=0; i<current_page.length; i++){
        let item = current_page[i];         
        tbody.appendChild(item);
      }
      Array.from(pageLi).forEach((e)=>{e.classList.remove("active");});
      pageLi[index-1].classList.add("active");
    }

    // SEARCH 
     search.onkeyup = e=>{
      const text = e.target.value;
      for(let i=0; i<tr.length; i++){
        const matchText = tr[i].querySelectorAll("td")[searchItem].innerText;
        if(matchText.toLowerCase().indexOf(text.toLowerCase()) > -1){
          tr[i].style.visibility = "visible";
        }else{
          tr[i].style.visibility= "collapse";
        }
      }
    }



  }
  pagination(pagElements);



