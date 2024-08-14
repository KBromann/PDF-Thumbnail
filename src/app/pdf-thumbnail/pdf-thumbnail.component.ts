import { Component, OnInit } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-thumbnail',
  templateUrl: './pdf-thumbnail.component.html',
  styleUrls: ['./pdf-thumbnail.component.css']
})
export class PdfThumbnailComponent implements OnInit {

  thumbnail: string | null = null;

  ngOnInit(): void {
    // Setze den Worker auf den lokalen Worker
   pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
  }

  async generateThumbnail(pdfUrl: string) {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;

    const page = await pdf.getPage(1);
    const scale = 0.5;
    const viewport = page.getViewport({ scale });

    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;

    this.thumbnail = canvas.toDataURL('image/png');
  }
}
