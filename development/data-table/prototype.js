(function(COMPONENTS, COMPONENT, EL, PROTOTYPE, UTIL) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "DataTable"
    });

    Prototype.DIRECTION = {};
    Prototype.DIRECTION.DESC = "DESC";
    Prototype.DIRECTION.ASC = "ASC";
    Prototype.SORT_BY = {};
    Prototype.SORT_BY.INTEGER = "INTEGER";
    Prototype.SORT_BY.ALPHA = "ALPHA";
    Prototype.SORT_BY.DATE = "DATE";

    Prototype.init = function(){
        var that = this;
        this.columns = this.getColumnsFromDOM();
        this.records = this.getRecordsFromDOM();

        // events
        UTIL.arrayFrom(this.getEl().querySelectorAll('thead th')).forEach(function(th, i){
            th.addEventListener('click', function(){
                that.handleClick(i);
            });
        });
    };

    Prototype.getColumns = function(){
        return this.columns;
    };

    Prototype.getColumnsFromDOM = function(){
        var that = this;
        return UTIL
        .arrayFrom(this.getEl().querySelectorAll('thead th'))
        .map(function(th){
            var direction;
            return {
                name: th.innerText,
                sortBy: th.dataset.oemSortBy || null,
                direction: that.DIRECTION.ASC
            }
        });
    };

    Prototype.getRecords = function(){
        return this.records;
    };

    Prototype.getRecordsFromDOM = function(){
        var that = this;
        var record, isRecord;
        var records = [];
        var trs = UTIL.arrayFrom(this.getEl().querySelectorAll('tbody tr'));
        for(var i = 0; i < trs.length; i++){
            record = {};
            UTIL.arrayFrom(trs[i].querySelectorAll('td')).forEach(function(td, col){
                record[that.columns[col].name] = UTIL.typeCast(td.innerHTML);
            });
            records.push(record);
        }
        return records;
    };

    Prototype.handleClick = function(col){

        var that = this;
        var column = this.columns[col];
        var headers = UTIL.arrayFrom(this.getEl().querySelectorAll('thead th'));
        var columnTh = headers[col];
        var isActive = columnTh.classList.contains('--sorted');

        // remove sort classes
        headers
        .forEach(function(th, i){
            th.classList.remove('--sorted');
        });

        // if this column is currently sorted, flip the direction
        if(isActive) {
            column.direction = column.direction === Prototype.DIRECTION.ASC ? Prototype.DIRECTION.DESC : Prototype.DIRECTION.ASC;
        }
        
        // add the right classes
        columnTh.classList.add('--sorted');

        // if asc, set classes
        if(column.direction === Prototype.DIRECTION.ASC) {
            columnTh.classList.add('--asc');
            columnTh.classList.remove('--desc');
        }

        // if desc, set classes
        if(column.direction === Prototype.DIRECTION.DESC) {
            columnTh.classList.add('--desc');
            columnTh.classList.remove('--asc');
        }

        // sort the records
        var sortedRecords = this.sortRecordsByColumn(column);

        // redraw the records
        this.redrawDOM(sortedRecords);
    };

    Prototype.redrawDOM = function(records){
        var that = this;
        var tr, td;
        UTIL.arrayFrom(this.getEl().querySelectorAll('tbody tr')).forEach(function(tr, i){
            tr.parentNode.removeChild(tr);
        });
        records.forEach(function(record recordIndex){
            tr = EL("tr", {}, that.columns.forEach(function(column, columnIndex){

            }));
        });
    };

    Prototype.sortRecordsByColumn = function(column){
        switch(column.sortBy){
            case Prototype.SORT_BY.INTEGER:
                return this.records.sort(function(a, b){
                    if(column.direction === Prototype.DIRECTION.ASC){
                        return a[column.name] - b[column.name];                        
                    } else {
                        return b[column.name] - a[column.name];
                    }
                });
            break;
            case Prototype.SORT_BY.ALPHA:
                return this.records.sort(function(a, b){
                    if(column.direction === Prototype.DIRECTION.ASC){
                        if(a[column.name] < b[column.name]) return -1;
                        if(a[column.name] > b[column.name]) return 1;
                        return 0;
                    } else {
                        if(a[column.name] < b[column.name]) return 1;
                        if(a[column.name] > b[column.name]) return -1;
                        return 0;
                    }
                });
            break;
            case Prototype.SORT_BY.DATE:
                return this.records.sort(function(a, b){
                    if(column.direction === Prototype.DIRECTION.ASC){
                        if(new Date(a[column.name]) > new Date(b[column.name])) return 1;
                        if(new Date(a[column.name]) < new Date(b[column.name])) return -1; 
                        return 0;                       
                    } else {
                        if(new Date(a[column.name]) > new Date(b[column.name])) return -1;
                        if(new Date(a[column.name]) < new Date(b[column.name])) return 1; 
                        return 0;
                    }
                });
            break;
        }
    };

    COMPONENTS.DataTable.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Core.Component,
    oem.Core.El,
    oem.Core.Prototype,
    oem.Core.Util
);