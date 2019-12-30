$(document).ready(function(){
    
    initalize()
    $('.days').click(function()
    {
            $(this).toggleClass('btn-success');
            var tab_name = "tab_1"
            var month = $(this).prop("classList")[0]
            var day = $(this).html()
            var state;
            if ($(this).hasClass('btn-success'))
                state = 1
            else
                state = 0
            key = month + '_' + day
            save(tab_name, key, state)
    });

});

function initalize()
{
    populateMonthsDays()
    var tab_name = "tab_1"
    chrome.storage.sync.get([tab_name], function(data) {
        Object.keys(data[tab_name]).forEach(function(key) {
            var month_day = key.split('_')
            $('.'+month_day[0]).each(function()
            {
                if ($(this).html() == month_day[1])
                {
                    $(this).toggleClass('btn-success', true)
                }
            });
        });
    });
}

function populateMonthsDays()
{
    var monthdays = {
        "jan": 31,
        "feb": 29,
        "mar": 31,
        "apr": 30,
        "may": 31,
        "jun": 30,
        "jul": 31,
        "aug": 31,
        "sep": 30,
        "oct": 31,
        "nov": 30,
        "dec": 31

      };
    
    $('.months').each(function()
    {
        var month = $(this).children('b').html().toLowerCase()
        var days = monthdays[month]
        for (var x = days; x >= 1; x--)
        {
            $(this).after(
                //'<div class="row days"><span class = "badge badge-pill badge-primary">'+ x + '</span></div>'
                '<div class="row"><div class="'+ month + ' days btn btn-circle">'+ x + '</div></div>'
            )
        }
    });


}

function save(tab_name, key, state)
{
    storage_data = {}
    chrome.storage.sync.get([tab_name], function(result) {
        var array = result[tab_name] ? result[tab_name] : {};
        array[key] = state;
        storage_data[tab_name] = array
        chrome.storage.sync.set(storage_data, function() {
            
        });
    });
}
