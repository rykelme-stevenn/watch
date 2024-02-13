import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapEyeFill, bootstrapEyeSlash } from '@ng-icons/bootstrap-icons'

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [SliderModule, FormsModule, ColorPickerModule, CommonModule, ToggleButtonModule, SelectButtonModule, NgIconComponent],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css',
  providers: [
    provideAnimations()
  ],
  viewProviders: [provideIcons({ bootstrapEyeFill, bootstrapEyeSlash })],
})
export class WatchComponent {

  controlVisible = true;
  isMobile: boolean = false;
  size = 24;
  color = 'black';
  bold = false;
  italic = false;
  watchType = 1
  stateOptions: any[] = [{ label: '24', value: 1 }, { label: '12', value: 2 }];

  styles = `font-size:${this.size}px; color: ${this.color}; font-weight: normal; font-style: normal; `;

  constructor(
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.updateTime();
    });

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });


  }

  updateTime() {

    const dataAtual = new Date();
    let hora = dataAtual.getHours();
    const minutos = dataAtual.getMinutes();
    const segundos = dataAtual.getSeconds();
    const periodo = hora >= 12 ? 'PM' : 'AM';

    // Formatando a hora para o formato 12 PM/AM
    hora = hora % 12;
    hora = hora ? hora : 12; // Se a hora for 0, troque por 12

    // Adicionando um zero à esquerda para minutos e segundos menores que 10
    const horaFormatada = hora < 10 ? '0' + hora : hora;
    const minutosFormatados = minutos < 10 ? '0' + minutos : minutos;
    const segundosFormatados = segundos < 10 ? '0' + segundos : segundos;

    let horaAtual = horaFormatada + ':' + minutosFormatados + ':' + segundosFormatados + ' ' + periodo;

    return horaAtual
  }

  returnStyle() {
    let fontSize = `font-size:${this.size}px;`
    let color = `color: ${this.color};`
    let bold = `font-weight: ${this.bold == true ? 'bold' : 'normal'};`
    let italic = `font-style: ${this.italic ? 'italic' : 'normal'};`
    let style = fontSize + color + bold + italic;
    this.styles = style;

    console.log(this.styles)
  }

  visibleChange(){
    this.controlVisible = !this.controlVisible;
  }
}
