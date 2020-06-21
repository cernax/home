import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'home';

  constructor() {
    // Called first time before the ngOnInit()
  }
  ngOnInit() {
    $.ajax(
      {
        url: 'https://cmetrix1.sharepoint.com/sites/PruebasAndres/_api/search/query?querytext=\'site:https://cmetrix1.sharepoint.com/sites/PruebasAndres/Paginas/Noticias/\'&selectproperties=\'Path,BoolPrincipal,Title,PublishingPageImageOWSIMGEX,CommentsOWSMTXT\'&rowlimit=3&sortlist=\'Created:descending\'&refinementfilters=\'and(ContentTypeId:not(' + '"' + '0x01200061A05D61C124714E8F0F43A1EF33B49B' + '"' + '), BoolPrincipal:' + '"' + 'true' + '"' + ')\'',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: data => {
          const d = data.PrimaryQueryResult.RelevantResults.Table.Rows;
          console.log(d);
          const divcar = document.getElementById('divcarrusel');
          let divdata = '';
          for (let i = 0; i < d.length; i++)
          {
            if (i === 0)
            {
              divdata = '<div class=' + '"' + 'carousel-item active' + '"' + '>';
            }
            else
            {
              divdata = '<div class=' + '"' + 'carousel-item' + '"' + '>';
            }
            let url = d[i].Cells[5].Value.split('src=')[1];
            if (url.indexOf('width') >= 0) {
              url = url.split('width=')[0];
            }

            url = url.split('style=')[0];

            const descript = d[i].Cells[6].Value == null ? '' : d[i].Cells[6].Value;

            console.log(url);
            divdata += 	 '<div class=' + '"' + 'view' + '"' + '>' +
              '<img class=' + '"' + 'img-fluid' + '"' + ' style=\'width: 840px; height: 430px;\'  src= alt="img"' + url + '/>' +
              '</div>' +
              '<div class=' + '"' + 'container' + '"' + '>' +
              '<div class=' + '"' + 'row' + '"' + 'style=\'position: absolute;bottom: 0px;width: 100%;height:88px;color: rgb(255, 255, 255);overflow: hidden;cursor: default;background-color: rgba(0, 0, 0, 0.5);visibility: visible;top: 70%;\'>' +
              '<div style=\'bottom: 0px;\' class=' + '"' + 'carousel-caption' + '"' + '>' +
              '<h3 class=' + '"' + 'text-center text-wrap' + '"' + '>' +  '<a class=' + '"' + 'container' + '"' + ' style=\'color:rgb(255, 255, 255)\' href=' + '"' + d[i].Cells[2].Value + '"' + '>' + d[i].Cells[4].Value + '</a>' + '</h3>' +
              '<p style=\'\' class=' + '"' + 'card-text' + '"' + '>' + descript + '</p>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</div>';
            $('#divcarrusel').append(divdata);
            divdata = '';
          }
        },
        onError: error => {
          console.log(error);
        }
      });
  }
}

