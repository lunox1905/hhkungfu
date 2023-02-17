const { PromiseProvider } = require("mongoose");

module.exports = {
    sum: (a, b) => a + b,
    showCheckCategory: (categorys, flim) => {
        var html = ``
        categorys.forEach(category => {
            var count = 0
            flim.forEach(flim => {
                if(String(flim) === String(category._id)) {
                    count ++
                    html += `<input type="checkbox" value="${category._id}" class="check-category" name="categorys" checked="checked">
                        <span>${category.title}</span>`
                }
            })
            if(count == 0)
            html +=`<input type="checkbox" value="${category._id}" class="check-category" name="categorys">
            <span>${category.title}</span>`
        })
        return html
    },
   
    pagination: (currentPage, totalPage, size, search = '', options)=>{
        var startPage, endPage, context;
    
    
        if (arguments.length === 3) {
        options = size;
        size = 5;
        }
    
        startPage = currentPage - Math.floor(size / 2);
        endPage = currentPage + Math.floor(size / 2);
    
        if (startPage <= 0) {
        endPage -= (startPage - 1);
        startPage = 1;
        }
    
        if (endPage > totalPage) {
        endPage = totalPage;
        if (endPage - size + 1 > 0) {
            startPage = endPage - size + 1;
        } else {
            startPage = 1;
        }
        }
    
        context = {
        startFromFirstPage: false,
        pages: [],
        endAtLastPage: false,
        search: search,
        };
        if (startPage === 1) {
        context.startFromFirstPage = true;
        }
        for (var i = startPage; i <= endPage; i++) {
        context.pages.push({
            page: i,
            isCurrent: i === currentPage,
            search: search
        });
        }
        if (endPage === totalPage) {
        context.endAtLastPage = true;
        }
        return options.fn(context);
    }
}