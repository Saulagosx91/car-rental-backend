import { Request, Response } from "express";
import { ReservationService } from "@app/services/reservation.service";
import { NotFoundException } from "@app/common/exceptions/httpException";
import { HttpStatusCode } from "@app/common/http/httpStatusCode";
import { CreateReservationDto } from "@app/dtos/reservation.dto";

const reservationService = new ReservationService();

export class ReservationController {
  async find(req: Request, res: Response) {
    try {
      const reservations = await reservationService.find();
      return res.status(HttpStatusCode.OK).json(reservations);

    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
      }
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  async findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const reservation = await reservationService.findOne(id);
      return res.status(HttpStatusCode.OK).json(reservation);

    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
      }
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });

    }
  }

  async create(req: Request, res: Response) {
    try {
      const reservationData: CreateReservationDto = req.body;
      reservationData.userId = req.user?.id!;
      const newReservation = await reservationService.create(reservationData);
      return res.status(HttpStatusCode.CREATED).json(newReservation);

    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  async findUserReservations(req: Request, res: Response) {
    try {
      const id = req.user?.id;
      const reservations = await reservationService.findUserReservations(id!);
      return res.status(HttpStatusCode.OK).json(reservations);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
      }
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }
}