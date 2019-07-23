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
  private __isLoading:boolean;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {LoadingController} __loadingC To control the ionic loading view
   */
  constructor(private __loadingC:LoadingController) { 
    this.__isLoading = false;
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
    if(this.__isLoading) return;
    this.__loadingC.create({
      message: "Espera un momento..."
    }).then(loading=> loading.present());
    this.__isLoading = true;
  }

  /**
   * Stops the loading animation
   * 
   * @access public
   */
  public stopLoading(){
    if(!this.__isLoading) return;
    this.__loadingC.dismiss().then(_=> this.__loadingC.dismiss()).catch(Error);
    this.__isLoading = false;
  }
}
