import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * Var to save if loading animation is visible or not
   * 
   * @access private
   * @var {boolean} isLoading
   */
  private isLoading:boolean;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   */
  constructor(private loadingC:LoadingController) { 
    this.isLoading = false;
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Start the loading animation
   * 
   * @access public
   */
  public startLoading(){
    if(this.isLoading) return;
    this.loadingC.create({
      message: "Espera un momento..."
    }).then(loading=> loading.present());
    this.isLoading = true;
  }

  /**
   * Stops the loading animation
   * 
   * @access public
   */
  public stopLoading(){
    if(!this.isLoading) return;
    this.loadingC.dismiss();
    this.isLoading = false;
  }
}
