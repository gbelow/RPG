import {HexUtils, Hex} from 'react-hexgrid'

const DIRECTIONS = {
    se:new Hex(1, 0, -1), ss: new Hex(0, 1, -1), sw:new Hex(-1, 1, 0),
    nw:new Hex(-1, 0, 1), nn:new Hex(0, -1, 1), ne:new Hex(1, -1, 0),
  };

export function ring(hex, radius){
  let startHex = HexUtils.add(hex, HexUtils.multiply(DIRECTIONS.nn, radius))
  let ringArr = [startHex]

  Object.values(DIRECTIONS).forEach((el)=>{
      let i =0
      for(i; i<radius; i++){
          ringArr.push(HexUtils.add(ringArr[ringArr.length-1], el))
      }
  })
  if(ringArr.length > 1){
      ringArr.pop()
  }
  return ringArr
}

export function circle(hex, radius){
  let resp = []
  let i = 0
  for(i;i<=radius; i++){
      resp.push(...ring(hex, i))
  }

  return resp
}

export function line(start, end){

  // Get all the intersecting hexes between start and end points
  let distance = HexUtils.distance(start, end);
  let intersects = [];
  let step = 1.0 / Math.max(distance, 1);
  for (let i=0; i<=distance; i++) {
    intersects.push(HexUtils.round(HexUtils.hexLerp(start, end, step * i)));
  }
  return intersects
}

export function cone(start, end, angle){
  let outerHexes = arc(start, end, angle)
  let resp = {}
  outerHexes.forEach(el => {
      line(start, el).forEach( i =>{
          resp[HexUtils.getID(i)] = i
      })
  })
  delete resp[HexUtils.getID(start)]

  return Object.values(resp)
}

export function rectangle(x, y, startCorner){
    let hexas = [];
    for (let q = 0; q < x; q++) {
        let offset = Math.floor(q/2); // or q>>1
        for (let r = -offset; r < y - offset; r++) {
            hexas.push(new Hex(q+ startCorner.q, r+ startCorner.r, -q-r+ startCorner.s));
        }
    }
    return hexas;
}

export function arc(start, end, angle){
    let distance = HexUtils.distance(start, end)
    let outerRing = ring(start, distance)
    let perimeter = 2*Math.PI*distance*angle/360
    let outerHexes = outerRing.filter((el)=>{
        return HexUtils.distance(end, el) < perimeter/2
    })
    return outerHexes
}
