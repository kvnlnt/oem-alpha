(function(COMPONENTS, COMPONENT, PROTOTYPE, UTIL) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "DataTable"
    });

    Prototype.DIRECTION = {};
    Prototype.DIRECTION.DESC = "DESC";
    Prototype.DIRECTION.ASC = "ASC";
    Prototype.DIRECTION.NONE = "NONE";

    Prototype.init = function(){
        var that = this;
        this.columns = this.getColumnsFromDOM();
        this.records = this.getRecordsFromDOM();

        // events
        UTIL.arrayFrom(this.getHeader().querySelectorAll('th')).forEach(function(th, i){
            th.addEventListener('click', function(){
                that.handleClick(i);
            });
        });
    };

    Prototype.handleClick = function(col){

        var that = this;
        var column = this.columns[col];
        var columnTh = this.getHeader().querySelectorAll('th')[col];

        // remove sort classes
        UTIL
        .arrayFrom(this.getHeader().querySelectorAll('th'))
        .forEach(function(th, i){
            th.classList.remove('--sorted');
            th.classList.remove('--asc');
            th.classList.remove('--desc');
        });

        // determine or flip sort direction
        if(column.direction === Prototype.DIRECTION.NONE){
            column.direction = Prototype.DIRECTION.ASC;
        } else {
            if(column.direction === Prototype.DIRECTION.ASC){
                column.direction = Prototype.DIRECTION.DESC;
            } else {
                column.direction = Prototype.DIRECTION.ASC;
            }
        }
        
        // add the right classes
        columnTh.classList.add('--sorted');
        if(column.direction === Prototype.DIRECTION.ASC) columnTh.classList.add('--asc');
        if(column.direction === Prototype.DIRECTION.DESC) columnTh.classList.add('--desc');
        // redraw the records

    };

    Prototype.getColumns = function(){
        return this.columns;
    };

    Prototype.getColumnsFromDOM = function(){
        var that = this;
        return UTIL
        .arrayFrom(this.getHeader().querySelectorAll('th'))
        .map(function(th){
            var direction;
            return {
                name: th.innerText,
                sortBy: th.dataset.oemSortBy || null,
                direction: that.DIRECTION.NONE
            }
        });
    };

    Prototype.getHeader = function(){
        return this.getEl().querySelectorAll('tr:first-child')[0];
    };

    Prototype.getRecords = function(){
        return this.records;
    };

    Prototype.getRecordsFromDOM = function(){
        var that = this;
        var record, isRecord;
        var records = [];
        var trs = UTIL.arrayFrom(this.getEl().querySelectorAll('tr'));
        for(var i = 0; i < trs.length; i++){
            isRecord = !trs[i].querySelectorAll('th').length;
            if(isRecord){
                record = {};
                UTIL.arrayFrom(trs[i].querySelectorAll('td')).forEach(function(td, col){
                    record[that.columns[col].name] = UTIL.typeCast(td.innerHTML);
                });
                records.push(record);
            }
        }
        return records;
    };

    Prototype.getTrs = function(){
        return this.getEl().querySelectorAll('tr');
    };

    COMPONENTS.DataTable.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Core.Component,
    oem.Core.Prototype,
    oem.Core.Util
);